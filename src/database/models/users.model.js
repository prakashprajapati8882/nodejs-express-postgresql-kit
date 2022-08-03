module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            firstName: {
                type: DataTypes.STRING,
                field: "first_name"
            },
            lastName: {
                type: DataTypes.STRING,
                field: "last_name"
            },
            email: {
                type: DataTypes.STRING
            },
            cellPhone: {
                type: DataTypes.STRING,
                field: "cell_phone"
            },
            password: {
                type: DataTypes.STRING
            },
            profilePic: {
                type: DataTypes.STRING,
                field: "profile_pic"
            }
        }
    );

    users.addHook("afterCreate", async function (userdata, options) {
        console.log(">nodejs-boilerplate | [users.model.js] > #38 | options : ", options);
        console.log(">nodejs-boilerplate | [users.model.js] > #39 | userData : ", userdata);
    });

    users.addHook("afterUpdate", async function (userdata, options) {
        console.log(">nodejs-boilerplate | [users.model.js] > #43 | options : ", options);
        console.log(">nodejs-boilerplate | [users.model.js] > #44 | userData : ", userdata);
    });

    users.addHook("afterDestroy", async function (userdata, options) {
        console.log(">nodejs-boilerplate | [users.model.js] > #48 | userdata : ", userdata);
        console.log(">nodejs-boilerplate | [users.model.js] > #49 | options : ", options);
    });
    
    return users;
};