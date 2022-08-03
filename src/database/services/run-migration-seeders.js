"use strict";

const path = require("path");
const Umzug = require("umzug");
const Sequelize = require("sequelize");

const getSequalizeIns = async () => {
    const pool = {
        min: process.env.SEQ_POOL_MAX || 0,
        max: process.env.SEQ_POOL_MAX || 70,
        idle: process.env.SEQ_POOL_IDLE || 10000,
        acquire: process.env.SEQ_POOL_IDLE || 300000
    };

    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            dialectOptions: {
                ssl: false
            },
            port: process.env.DB_PORT,
            pool: pool,
            logging: false
        }
    );
};

const runMigrationsAndSeeders = async () => {
    try {
        const migrationRes = await runMigrations();
        if (migrationRes !== undefined || migrationRes !== null) {
            console.log(`Migrations was running at ${new Date()}`);
            console.log(`Migrations output : ${migrationRes || "successfully executed"}`);
        }
    } catch (err) {
        console.log(">nodejs-boilerplate | [run-migration-seeders.js] > #39 | err : ", err);
        throw new Error(`runMigrationsAndSeeders.js -> ${err}`);
    }
};

const runMigrations = async function () {
    try {
        const sequelize = await getSequalizeIns();
        const migrationsConfig = new Umzug({
            migrations: {
                path: path.join(__dirname, "../migrations/"),
                params: [
                    sequelize.getQueryInterface(),
                    Sequelize
                ],
                pattern: /\.js$/
            },
            context: sequelize.getQueryInterface(),
            storage: "sequelize",
            storageOptions: {
                sequelize: sequelize,
                modelName: "system_migrations"
            }
        });
        await migrationsConfig.up();
        console.log(" migrations completed ");
    } catch (error) {
        console.log(">nodejs-boilerplate | [run-migration-seeders.js] > #66 | error : ", error);
        throw error;
    }
};

const runSeeders = async function () {
    try {
        const sequelize = await getSequalizeIns();
        const seedersConfig = new ({
            migrations: {
                path: path.join(__dirname, "../seeders/"),
                params: [
                    sequelize.getQueryInterface(),
                    Sequelize
                ],
                pattern: /\.js$/
            },
            context: sequelize.getQueryInterface(),
            storage: "sequelize",
            storageOptions: {
                sequelize: sequelize,
                modelName: "system_seeds"
            }
        })();
        await seedersConfig.up();
        console.log(" seeders completed ");
    } catch (error) {
        console.log(">nodejs-boilerplate | [run-migration-seeders.js] > #93 | error : ", error);
    }
};

module.exports = {
    runMigrationsAndSeeders,
    runMigrations,
    runSeeders,
    getSequalizeIns
};
