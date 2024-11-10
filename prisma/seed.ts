import { Prisma, PrismaClient } from '@prisma/client';
const { handleNullValues } = require('../util/filterNoise.js');
const intensity_samples = require('./dataset.json');
const lables = require('./label.json');
const meatTypes = require('./type.json');

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
          wavelengths.push(e[key] ?? 0);
        } else if (key.startsWith('absorbance')) {
          absorbance.push(e[key] ?? 0);
        } else if (key.startsWith('reference')) {
          reference.push(e[key] ?? 0);
        } else if (key.startsWith('sample')) {
          sample.push(e[key] ?? 0);
        }
      });
      const labelId = e?.file_name.match(/(\d+)_Hadamard/)
        ? Number(e?.file_name.match(/(\d+)_Hadamard/)[1].slice(-1))
        : Number(e?.file_name.match(/(\d+)Hadamard/)[1].slice(-1));
      const typeId = e?.file_name.match(/(\d+)_Hadamard/)
        ? Number(e?.file_name.match(/(\d+)_Hadamard/)[1].slice(0, 2))
        : Number(e?.file_name.match(/(\d+)Hadamard/)[1].slice(0, 2));
      return {
        fileName: e?.file_name,
        labelId,
        typeId,
        systemTemp: parseFloat(e?.system_temp),
        detectorTemp: parseFloat(e?.detector_temp),
        humidity: parseFloat(e?.humidity),
        lampPD: parseInt(e?.lamp_PD),
        startWavelength: parseInt(wavelengths[0]),
        endWavelength: parseInt(wavelengths[wavelengths.length - 1]),
        startAbsorbance: parseInt(absorbance[0]),
        endAbsorbance: parseInt(absorbance[absorbance.length - 1]),
        wavelength: wavelengths,
        absorbance: absorbance,
        referenceSignal: reference,
        sampleSignal: sample,
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
  // seed data of label
  await prisma.type.createMany({
    data: meatTypes.map((e) => ({ name: e.name })),
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
