import { PrismaClient} from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;

//https://firebasestorage.googleapis.com/v0/b/sunsetsnack-3332c.appspot.com/o/images%2Fusers%2Fa4a57527c92a3153728e7cd716cd2ca8.webp?alt=media&token=71f594cc-771b-4539-b9d2-a1eb0b3cfab8