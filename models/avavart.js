module.exports = function(sequelize, Sequalize) {
    var ArtVotesSchema = sequelize.define("ArtVotes", {
        art: Sequalize.INTEGER,
        music: Sequalize.INTEGER,
        access_right: Sequalize.INTEGER,
        game_props: Sequalize.INTEGER,
        physical_goods: Sequalize.INTEGER,
        standing: Sequalize.INTEGER,
        web_2_database: Sequalize.INTEGER
    },{
        timestamps: false,
        tableName: 'art_votes'
    });
    return ArtVotesSchema;
}