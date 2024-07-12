import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const body = await req.json();
        const { nama, username, email, no_telp, password } = body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Check if email already exists
        const existingUserByEmail = await prisma.User.findFirst({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        // Check if username already exists
        const existingUserByUsername = await prisma.User.findFirst({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 });
        }

        // Check if no_telp already exists
        const existingUserByNoTelp = await prisma.User.findFirst({
            where: { no_telp: no_telp }
        });
        if (existingUserByNoTelp) {
            return NextResponse.json({ user: null, message: "User with this phone number already exists" }, { status: 409 });
        }

        // Create the new user
        const newUser = await prisma.User.create({
            data: {
                nama,
                username,
                email,
                no_telp,
                password: hashedPassword
            }
        });

        return NextResponse.json({ user: newUser, message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
