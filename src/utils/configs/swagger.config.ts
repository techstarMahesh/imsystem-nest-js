import { DocumentBuilder } from '@nestjs/swagger';

const discription = '## The Intern Management System API';

const title = 'Intern Management System';

const version = '1.0';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(discription)
  .setTermsOfService('https://example.com/terms')
  .setVersion(version)
  .addBearerAuth()
  .build();
