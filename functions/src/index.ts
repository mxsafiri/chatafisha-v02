/**
 * Firebase Cloud Functions for Chatafisha v2
 *
 * These functions handle user management, role-based access control,
 * and other server-side operations.
 */

import {onCall, HttpsError} from "firebase-functions/v2/https";
import {
  onDocumentCreated,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK with the correct database name
admin.initializeApp({
  databaseURL: "https://chatafisha-v2.firebaseio.com",
  projectId: "chatafisha-v2",
  storageBucket: "chatafisha-v2.appspot.com",
  credential: admin.credential.applicationDefault(),
});

// Get Firestore instance with the correct database name
const db = admin.firestore();
db.settings({
  ignoreUndefinedProperties: true,
  databaseId: "chatafisha",
});

/**
 * Sets custom claims for a user based on their role in Firestore
 * This function is triggered when a user document is created in Firestore
 */
export const setUserRoleClaims =
  onDocumentCreated("users/{userId}", async (event) => {
    try {
      const userId = event.params.userId;
      const userData = event.data?.data();

      if (!userData) {
        logger.error(`No user data found for user ${userId}`);
        return;
      }

      const {role} = userData;

      if (!role) {
        logger.error(`No role specified for user ${userId}`);
        return;
      }

      // Set custom claims based on role
      await admin.auth().setCustomUserClaims(
        userId,
        {
          role,
          isVerifier: role === "verifier",
          isSubmitter: role === "submitter",
          isFunder: role === "funder",
          isAdmin: role === "admin",
        }
      );

      logger.info(
        `Updated custom claims for user ${userId} with role ${role}`
      );

      // Update the user document to indicate that claims have been set
      await db.collection("users").doc(userId).update({
        claimsUpdated: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      logger.error("Error setting custom claims", error);
    }
  });

/**
 * Updates custom claims when a user's role is changed
 * This function is triggered when a user document is updated in Firestore
 */
export const updateUserRoleClaims =
  onDocumentUpdated("users/{userId}", async (event) => {
    try {
      const userId = event.params.userId;
      const beforeData = event.data?.before.data();
      const afterData = event.data?.after.data();

      if (!beforeData || !afterData) {
        logger.error(`Missing data for user ${userId}`);
        return;
      }

      // Only proceed if the role has changed
      if (beforeData.role === afterData.role) {
        return;
      }

      const {role} = afterData;

      // Set custom claims based on new role
      await admin.auth().setCustomUserClaims(
        userId,
        {
          role,
          isVerifier: role === "verifier",
          isSubmitter: role === "submitter",
          isFunder: role === "funder",
          isAdmin: role === "admin",
        }
      );

      logger.info(
        `Updated custom claims for user ${userId} with role ${role}`
      );

      // Update the user document to indicate that claims have been updated
      await db.collection("users").doc(userId).update({
        claimsUpdated: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      logger.error("Error updating custom claims", error);
    }
  });

/**
 * Callable function to get the current user's claims and role
 * This can be used to verify that custom claims are set correctly
 */
export const getCurrentUserClaims =
  onCall({enforceAppCheck: false}, async (request) => {
    try {
      const {auth} = request;

      if (!auth) {
        throw new HttpsError(
          "unauthenticated",
          "User must be authenticated"
        );
      }

      const {uid} = auth;
      const userRecord = await admin.auth().getUser(uid);

      return {
        uid,
        customClaims: userRecord.customClaims || {},
        email: userRecord.email,
        displayName: userRecord.displayName,
      };
    } catch (error) {
      logger.error("Error getting user claims", error);
      throw new HttpsError(
        "internal",
        "Error retrieving user claims"
      );
    }
  });
