const model = require('./productModel');
const cloudinary = require("../../config/cloudinary.config");

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id {@link String}
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.get = async (id) => {
  try {
    const product = await model.findById(id);
    if (product === null) {
      return {mess: `Product id '${id}' not found`};
    }
    return product;
  } catch (err) {
    throw err;
  }
};

/**
 * Phan trang cac product, moi trang co toi da 5 product
 * @param page
 * @returns {Promise<void>}
 */
exports.paging = async (page) => {
  try {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    return await model
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage);
  } catch (err) {
    throw err;
  }
};

/**
 * Lay list cac san pham <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<[{product: model}]>}
 */
exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

exports.getAllImages = async () => {
  try {
    const productsImages = [];
    
    for await (const product of model.find({}, { image_url: true, name: true }, { lean: true })) {
      if (!product.image_url.startsWith("https://res.cloudinary.com")) {
        const images = [];

        await cloudinary.api.resources(
          {
            type: "upload",
            prefix: product.image_url, // add your folder
          },
          function (error, result) {
            const { resources } = result;
            resources.forEach((e) => images.push(e.url));
          }
        );
        productsImages.push({ _id: product._id, name: product.name, image_url: images })
      } else {
        productsImages.push({ _id: product._id, name: product.name, image_url: [product.image_url] });
      }
    }

    return productsImages;
  } catch (err) {
    throw err;
  }
}

/**
 * Them san pham moi vao database va tra ve ket qua san pham da them <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param newProduct
 * @param image
 * @returns {Promise<{product: model}>}
 */
exports.insert = async (newProduct, image) => {
  try {
    // Lưu thông tin cơ bản của product
    let { discount, offer } = newProduct;

    discount = parseFloat(discount.split(':')[1].trim());

    newProduct.discount = { rate: discount };
    newProduct.offer = { content: offer };

    const product = new model(newProduct);
    let result;
    // Upload images
    if (image) {
      result = await cloudinary.uploader.upload(image.path, {
        public_id: product._id,
        folder: "product_image",
        use_filename: true,
      });
    }
    const { url } = result ?? "";
    product.image_url = url;

    await product.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Tim san pham bang id, update thong tin san pham ton tai trong database
 *
 * @param id
 * @param updateProduct
 * @param image
 * @returns {Promise<{product: model}>}
 */
exports.update = async (id, updateProduct, image) => {
  try {
    let { discount, offer } = updateProduct;

    discount = parseFloat(discount.split(':')[1].trim());

    updateProduct.discount = { rate: discount };
    updateProduct.offer = { content: offer };

    let result;
    if (image) {
      result = await cloudinary.uploader.upload(image.path, {
        public_id: id,
        folder: "product_image",
        use_filename: true,
      });
    }
    const { url } = result ?? "";
    updateProduct.image_url = url;

    return await model.findByIdAndUpdate(id, updateProduct,
        { new: true });
  } catch (err) {
    throw err;
  }
}

/**
 * Xoa san pham dang co trong database bang id
 *
 * @param id
 * @returns {Promise<{product: model}>}
 */
exports.delete = async (id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}
