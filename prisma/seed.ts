import { Prisma, PrismaClient } from '@prisma/client';
const { handleNullValues } = require('../util/filterNoise.js');
const intensity_samples = require('./sample.json');
const lables = require('./label.json');

// init Prisma Client
const prisma = new PrismaClient();
// load meat dataset from sample.json
const getAllIntensities = (): Prisma.IntensityCreateManyInput[] => {
  const intensities = intensity_samples;

  const IntensitiesData: Prisma.IntensityCreateManyInput[] = intensities.map(
    (e, i) => {
      console.log(i);
      const wavelengths = [];
      const absorbance = [];
      const reference = [];
      const sample = [];
      Object.keys(e).forEach((key) => {
        if (key.startsWith('wavelength')) {
          wavelengths.push(e[key]);
        } else if (key.startsWith('absorbance')) {
          absorbance.push(e[key]);
        } else if (key.startsWith('reference')) {
          reference.push(e[key]);
        } else if (key.startsWith('sample')) {
          sample.push(e[key]);
        }
      });
      return {
        labelId: e?.file_name?.includes('raw')
          ? 1
          : e?.file_name?.includes('drugged')
          ? 3
          : 2,
        systemTemp: parseFloat(e?.system_temp),
        detectorTemp: parseFloat(e?.detector_temp),
        humidity: parseFloat(e?.humidity),
        lampPD: parseInt(e?.lamp_PD),
        startWavelength: parseInt(wavelengths[0]),
        endWavelength: parseInt(wavelengths[wavelengths.length - 1]),
        startAbsorbance: parseInt(absorbance[0]),
        endAbsorbance: parseInt(absorbance[absorbance.length - 1]),
        wavelength: handleNullValues(wavelengths),
        absorbance: handleNullValues(absorbance),
        referenceSignal: handleNullValues(reference),
        sampleSignal: handleNullValues(sample),
      };
    },
  );

  return IntensitiesData;
};

async function main() {
  // seed data of label
  await prisma.label.createMany({
    data: lables.map((e) => ({ name: e.name })),
    // skipDuplicates: true,
  });
  // seed dataset of intensity
  await prisma.intensity.createMany({
    data: getAllIntensities(),
    // skipDuplicates: true,
  });
}

// execute main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client
    await prisma.$disconnect();
  });
