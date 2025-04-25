/**
 * Cloud Functions for Chatafisha v2
 *
 * These functions handle user authentication, role management,
 * and other server-side operations for the Chatafisha platform.
 */

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");
const {getAuth} = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * Set custom claims for a user based on their role
 * This function is triggered when a user document is created or updated
 */
exports.processUserRole = onDocumentUpdated("users/{userId}", async (event) => {
  try {
    const userId = event.params.userId;
    const afterData = event.data.after.data();
    const beforeData = event.data.before.data();

    // Only process if the role has changed
    if (afterData.role === beforeData.role) {
      logger.info(`No role change for user ${userId}`);
      return null;
    }

    const role = afterData.role;
    logger.info(`Setting role '${role}' for user ${userId}`);

    // Set custom claims based on user role
    await getAuth().setCustomUserClaims(userId, {role});

    // Update user document to indicate claims have been set
    await getFirestore().collection("users").doc(userId).update({
      claimsUpdated: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    logger.info(`Successfully set custom claims for user ${userId}`);
    return null;
  } catch (error) {
    logger.error(`Error setting custom claims: ${error.message}`);
    return null;
  }
});

/**
 * Create a new user with a specific role
 * This function can be called from the client
 */
exports.createUser = onCall({enforceAppCheck: false}, async (request) => {
  try {
    // Check if the request is authorized
    if (!request.auth) {
      throw new HttpsError(
          "unauthenticated",
          "User must be authenticated to create users",
      );
    }

    // Check if the caller is an admin
    const callerUid = request.auth.uid;
    const callerDoc = await getFirestore()
        .collection("users")
        .doc(callerUid)
        .get();

    if (!callerDoc.exists || callerDoc.data().role !== "admin") {
      throw new HttpsError(
          "permission-denied",
          "Only admins can create users",
      );
    }

    const {email, password, displayName, role} = request.data;

    // Validate inputs
    if (!email || !password || !displayName || !role) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    // Create the user in Firebase Auth
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName,
    });

    // Set custom claims for the user
    await getAuth().setCustomUserClaims(userRecord.uid, {role});

    // Create user document in Firestore
    await getFirestore().collection("users").doc(userRecord.uid).set({
      email,
      displayName,
      role,
      claimsUpdated: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    logger.info(`Created new user ${userRecord.uid} with role ${role}`);

    return {uid: userRecord.uid};
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * Update a user's role
 * This function can be called from the client
 */
exports.updateUserRole = onCall({enforceAppCheck: false}, async (request) => {
  try {
    // Check if the request is authorized
    if (!request.auth) {
      throw new HttpsError(
          "unauthenticated",
          "User must be authenticated to update roles",
      );
    }

    // Check if the caller is an admin
    const callerUid = request.auth.uid;
    const callerDoc = await getFirestore()
        .collection("users")
        .doc(callerUid)
        .get();

    if (!callerDoc.exists || callerDoc.data().role !== "admin") {
      throw new HttpsError(
          "permission-denied",
          "Only admins can update user roles",
      );
    }

    const {userId, role} = request.data;

    // Validate inputs
    if (!userId || !role) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    // Set custom claims for the user
    await getAuth().setCustomUserClaims(userId, {role});

    // Update user document in Firestore
    await getFirestore().collection("users").doc(userId).update({
      role,
      claimsUpdated: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    logger.info(`Updated user ${userId} to role ${role}`);

    return {success: true};
  } catch (error) {
    logger.error(`Error updating user role: ${error.message}`);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * Get current user data with custom claims
 * This function can be called from the client
 */
exports.getCurrentUser = onCall({enforceAppCheck: false}, async (request) => {
  try {
    // Check if the request is authorized
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "User must be authenticated");
    }

    const uid = request.auth.uid;

    // Get user data from Firestore
    const userDoc = await getFirestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      throw new HttpsError("not-found", "User document not found");
    }

    // Get user record from Auth
    const userRecord = await getAuth().getUser(uid);

    // Return combined user data
    return {
      uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      role: userRecord.customClaims?.role || userDoc.data().role,
      ...userDoc.data(),
    };
  } catch (error) {
    logger.error(`Error getting current user: ${error.message}`);
    throw new HttpsError("internal", error.message);
  }
});
