import { DocumentBuilder } from '@nestjs/swagger';

const AdminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZGV2Iiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzAzNjUxNjIyLCJleHAiOjE3NjM2NTE2MjJ9.8jDHp6006hBHjbbhD9QwzTIkr_SMNbeQgCHdEGUNQZQ';

const UserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZGV2Iiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzAzNjUxNjIyLCJleHAiOjE3NjM2NTE2MjJ9.8jDHp6006hBHjbbhD9QwzTIkr_SMNbeQgCHdEGUNQZQ';

const discription =
  '## The Intern Management System API description\nAdmin Token : ' + AdminToken + '\n' + 'User Token : ' + UserToken;

const title = 'Intern Management System';

const version = '1.0';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(discription)
  .setTermsOfService('https://example.com/terms')
  .setVersion(version)
  .addBearerAuth()
  .build();
