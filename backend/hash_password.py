from passlib.hash import bcrypt

def hash_password(password):
    return bcrypt.hash(password)

if __name__ == "__main__":
    pwd = input("Masukkan password admin: ")
    hashed = hash_password(pwd)
    print("Password hashed:", hashed)
