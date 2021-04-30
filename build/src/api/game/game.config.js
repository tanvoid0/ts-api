"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = exports.RAWG_API = exports.RAWG_URL = void 0;
const client_id = "defztkbmkitcienf9o6ls6z4i00xmh";
const bearer = "Bearer 28cc4es16tt63y5ljz5hclamqn9gu2";
const body = "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;";
exports.RAWG_URL = "https://api.rawg.io/api";
exports.RAWG_API = "383f3e34c0e4432385d6903e09f8f46e";
exports.headers = {
    'Accept': 'application/json',
    'Client-ID': client_id,
    'Authorization': bearer,
};
//# sourceMappingURL=game.config.js.map