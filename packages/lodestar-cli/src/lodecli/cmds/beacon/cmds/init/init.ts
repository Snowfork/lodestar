import * as path from "path";
import {Arguments} from "yargs";

import {IBeaconArgs} from "../../options";
import {mkdir} from "../../../../util";
import {initPeerId, initEnr, readPeerId} from "../../../../network";
import {initBeaconConfig} from "../../config";

/**
 * Initialize lodestar-cli with an on-disk configuration
 */
export async function init(args: Arguments<IBeaconArgs>): Promise<void> {
  // initialize root directory
  await mkdir(args.rootDir);
  // initialize beacon directory
  await mkdir(args.beaconDir);
  // initialize beacon configuration file
  await initBeaconConfig(args.configPath, args);
  // initialize beacon db path
  await mkdir(args.dbPath);
  // initialize peer id
  await initPeerId(args.peerIdPath);
  const peerId = await readPeerId(args.peerIdPath);
  // initialize local enr
  await initEnr(args.enrPath, peerId);
}
