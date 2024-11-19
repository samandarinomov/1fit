import { prisma } from "./connection"
import { hash } from 'bcryptjs'

const insertAdmin = async () => {
    const findAdmin = await prisma.user.findUnique({ where: { email: "admin@gmail.com" } });
    if (findAdmin) {
        console.log({
            message: 'Admin user already exists',
            admin: {
                email: "admin@gmail.com",
                password: "55555"
            }
        })
        return;
    }

    const hashedPassword = await hash('55555', 12)

    const admin = await prisma.user.create({
        data: {
            fullname: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            isAdmin: true
        }
    })

    console.log({
        message: 'Admin user created successfully',
        admin: {
            email: "admin@gmail.com",
            password: "55555"
        }
    })

}

insertAdmin();