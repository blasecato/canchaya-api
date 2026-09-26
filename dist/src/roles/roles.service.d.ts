import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): import("../../generated/prisma/models").Prisma__rolesClient<{
        code: string;
        description: string | null;
        created_at: Date;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        code: string;
        description: string | null;
        created_at: Date;
        name: string;
    }[]>;
    findOne(code: string): Promise<{
        code: string;
        description: string | null;
        created_at: Date;
        name: string;
    }>;
    update(code: string, updateRoleDto: UpdateRoleDto): import("../../generated/prisma/models").Prisma__rolesClient<{
        code: string;
        description: string | null;
        created_at: Date;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    remove(code: string): import("../../generated/prisma/models").Prisma__rolesClient<{
        code: string;
        description: string | null;
        created_at: Date;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
