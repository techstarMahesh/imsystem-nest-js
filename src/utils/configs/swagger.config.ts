import { DocumentBuilder } from '@nestjs/swagger';

const discription =
  'This is a backed of Intern Management System API. Here is the list of APIs for Intern Management System through swagger.';

const title = 'Intern Management System';

const version = '1.0';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(discription)
  .setTermsOfService('/docs')
  .setVersion(version)
  .addBearerAuth()
  .build();
