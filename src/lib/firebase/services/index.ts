// Import and re-export each service module
import * as authService from './auth';
import * as projectsService from './projects';
import * as usersService from './users';
import * as verificationService from './verification';
import * as fundingService from './funding';

// Export all services
export { 
  authService,
  projectsService,
  usersService,
  verificationService,
  fundingService
};
