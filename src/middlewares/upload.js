import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const { path: filePath, filename } = req.file;

    const thumbFilename = `${filename}_thumb.png`;
    const thumbPath = `uploads/${thumbFilename}`;

    await sharp(filePath)
      .resize(160, 160)
      .toFormat('png')
      .toFile(thumbPath);

    console.log(`Thumbnail created at ${thumbPath}`);

    next();
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    next(error);
  }
}

export { createThumbnail };