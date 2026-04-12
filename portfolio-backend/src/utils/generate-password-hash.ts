import { hashPassword } from "./password.js";

const plainPassword = process.argv[2];

if (!plainPassword) {
  console.error("Usage: npm run hash:password -- <plain-password>");
  process.exit(1);
}

hashPassword(plainPassword)
  .then((hash) => {
    console.log(hash);
  })
  .catch((error) => {
    console.error("Failed to generate password hash", error);
    process.exit(1);
  });
