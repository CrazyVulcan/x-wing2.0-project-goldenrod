const sharp = require('sharp');
const fsPromises = require('fs/promises');
const fs = require('fs');

const pilotDir = './src/images/En/pilots';
const pilotArtDir = './src/images/Art/pilots';

const upgradeDir = './src/images/En/upgrades';
const upgradeArtDir = './src/images/Art/upgrades';

const flipped = [
  'integratedsfoils',
  'os1arsenalloadout',
  'pivotwing',
  'servomotorsfoils',
  'xg1assaultconfiguration',
  'grapplingstruts',
  'delta7b',
  'calibratedlasertargeting',
  'landingstruts',
  'corsairrefit',
  'stabilizedsfoils',
  'alpha3bbesh',
  'interceptbooster',
  'maneuverassistmgk300',
  'targetassistmgk300',
  'repulsorliftstabilizers',
  'alpha3eesk',
  'sensitivecontrols',
  'tiedefenderelite',
  'vectoredcannonsrz1',
  'wartimeloadout',
  'enhancedjammingsuite',
  'drillbeak',
  'enhancedpropulsion',
  'tractortentacles',
];

const runner = async () => {
  // Loop all pilots
  const pilots = await fsPromises.readdir(pilotDir);
  for await (const pilot of pilots) {
    const output = `${pilotArtDir}/${pilot}`;
    // Look for art
    if (!pilot.includes('_') && !fs.existsSync(output)) {
      // If none -> crop it!
      const input = `${pilotDir}/${pilot}`;
      await sharp(input)
        .resize(376, 523)
        .extract({ width: 376, height: 152, left: 0, top: 0 })
        .toFile(output)
        .then((new_file_info) => console.log(pilot))
        .catch((err) => console.log(err));
    }
  }

  // Loop all upgrades
  // Loop all pilots
  const upgrades = await fsPromises.readdir(upgradeDir);
  for await (const upgrade of upgrades) {
    const output = `${upgradeArtDir}/${upgrade}`;
    // Look for art
    if (!upgrade.includes('_') && !fs.existsSync(output)) {
      // If none -> crop it!
      const input = `${upgradeDir}/${upgrade}`;
      await sharp(input)
        .resize(700, 503)
        .extract(
          flipped.includes(upgrade.split('.')[0])
            ? { width: 400, height: 204, left: 20, top: 0 }
            : { width: 400, height: 204, left: 280, top: 0 }
        )
        .toFile(output)
        .then((new_file_info) => console.log(upgrade))
        .catch((err) => console.log(err));
    }
  }

  // Look for art
  // If none -> crop it!
};

runner();
