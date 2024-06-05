import nconf from "nconf";
import path from "path";

const configPath = path.join(__dirname, "../config/config.json");

export default function setupNconf(){
    nconf.argv().env().file({file:configPath});
}