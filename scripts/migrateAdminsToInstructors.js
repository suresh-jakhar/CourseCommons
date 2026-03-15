require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");

async function migrate() {
    await mongoose.connect(process.env.MONGO_URL);
    const db = mongoose.connection.db;

    const admins = await db.collection("admins").find({}).toArray();

    if (admins.length === 0) {
        console.log("No documents found in 'admins' collection. Nothing to migrate.");
        await mongoose.disconnect();
        return;
    }

    console.log(`Found ${admins.length} document(s) in 'admins'. Migrating to 'instructors'...`);

    for (const doc of admins) {
        const exists = await db.collection("instructors").findOne({ _id: doc._id });
        if (exists) {
            console.log(`  SKIP  ${doc.email} — already exists in 'instructors'`);
        } else {
            await db.collection("instructors").insertOne(doc);
            console.log(`  COPIED ${doc.email}`);
        }
    }

    console.log("Migration complete. You can drop the 'admins' collection when ready.");
    await mongoose.disconnect();
}

migrate().catch((err) => {
    console.error("Migration failed:", err.message);
    process.exit(1);
});
