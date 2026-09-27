import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): import("../../generated/prisma/models").Prisma__rolesClient<{
        created_at: Date;
        name: string;
        description: string | null;
        code: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        created_at: Date;
        name: string;
        description: string | null;
        code: string;
    }[]>;
    findOne(code: string): Promise<{
        created_at: Date;
        name: string;
        description: string | null;
        code: string;
    }>;
    update(code: string, updateRoleDto: UpdateRoleDto): import("../../generated/prisma/models").Prisma__rolesClient<{
        created_at: Date;
        name: string;
        description: string | null;
        code: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    remove(code: string): import("../../generated/prisma/models").Prisma__rolesClient<{
        created_at: Date;
        name: string;
        description: string | null;
        code: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
