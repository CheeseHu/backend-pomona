import { Prisma, PrismaClient } from '@prisma/client';
const intensity_samples = require('./sample.json');
const lables = require('./label.json');

// init Prisma Client
const prisma = new PrismaClient();
const getAllIntensities = (): Prisma.IntensityCreateManyInput[] => {
  const intensities = intensity_samples;
  // for (let index = 0; index < 100; index++) {
  //   intensities.push(intensity_samples[0]);
  // }

  const IntensitiesData: Prisma.IntensityCreateManyInput[] = intensities.map(
    (e, i) => {
      console.log(i);
      return {
        labelId: 1,
        headerVersion: e?.header_version,
        systemTemp: parseFloat(e?.system_temp),
        detectorTemp: parseFloat(e?.detector_temp),
        humidity: parseFloat(e?.humidity),
        lampPD: parseInt(e?.lamp_pd),
        shiftVectorCoefficients: e?.shift_vector_coefficients?.map((str) =>
          parseFloat(str),
        ),
        pixelWavelengthCoefficients: e?.pixel_to_wavelength_coefficients?.map(
          (str) => parseFloat(str),
        ),
        serialNumber: parseInt(e?.serial_number),
        scanConfigName: e?.scan_config_name,
        scanConfigType: e?.scan_config_type,
        startWavelength: parseInt(e?.start_wavelength),
        endWavelength: parseInt(e?.end_wavelength),
        patternPixelWidth: parseFloat(e?.pattern_pixel_width),
        exposure: parseFloat(e?.exposure),
        digitalResolution: parseInt(e?.digital_resolution),
        numRepeats: parseInt(e?.num_repeats),
        pgaGain: parseInt(e?.pga_gain),
        totalMeasurementTimeSec: parseFloat(e?.total_measurement_time_in_sec),
        wavelength: e?.wavelength?.map((str) => parseFloat(str)),
        absorbance: e?.absorbance?.map((str) => parseFloat(str)),
        referenceSignal: e?.reference_signal?.map((str) => parseFloat(str)),
        sampleSignal: e?.sample_signal?.map((str) => parseFloat(str)),
      };
    },
  );

  return IntensitiesData;
};

async function main() {
  // create dummy articles
  // await prisma.article.upsert({
  //   where: { title: 'Prisma Adds Support for MongoDB' },
  //   update: {},
  //   create: {
  //     title: 'Prisma Adds Support for MongoDB',
  //     body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
  //     description:
  //       "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
  //     published: false,
  //   },
  // });
  // await prisma.article.upsert({
  //   where: { title: "What's new in Prisma? (Q1/22)" },
  //   update: {},
  //   create: {
  //     title: "What's new in Prisma? (Q1/22)",
  //     body: 'Our engineers have been working hard, issuing new releases with many improvements...',
  //     description:
  //       'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
  //     published: true,
  //   },
  // });

  await prisma.label.createMany({
    data: lables.map((e) => ({ name: e.name })),
    // skipDuplicates: true,
  });
  // seed dummy density
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
