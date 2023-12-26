import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/roleEnum';

export const ROLES_KEY = 'roles';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
