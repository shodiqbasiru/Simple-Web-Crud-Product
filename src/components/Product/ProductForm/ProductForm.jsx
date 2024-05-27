import React, { useState, useMemo, useEffect } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../../services/ProductService";

const ProductForm = () => {
  const { register, handleSubmit, clearErrors, reset, setValue } = useForm({
    mode: "onChange",
  });
  const [previewImg, setPreviewImg] = useState(
    "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"  );

  const { id } = useParams();
  const productService = useMemo(() => ProductService(), []);
  const navigate = useNavigate();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewImg(url);
  };

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      const product = {
        skuCode: data.skuCode,
        productName: data.productName,
        qty: data.qty,
        price: data.price,
      };

      form.append("product", JSON.stringify(product));
      form.append("image", data.image[0]);

      if (id) {
        const updateMenu = { ...product, id };
        form.set("product", JSON.stringify(updateMenu));

        await productService.update(form);
      } else {
        await productService.create(form);
      }

      navigate("/");
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    clearErrors();
    reset();
  };

  const getProduct = async () => {
    const { data } = await productService.getById(id);
    setValue("skuCode", data.skuCode);
    setValue("productName", data.productName);
    setValue("qty", data.qty);
    setValue("price", data.price);
    setPreviewImg(data.image.url);
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id, setValue, productService]);

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-body">
          <div>
            <label htmlFor="skuCode">SKU Code</label>
            <input {...register("skuCode")} type="text" id="skuCode" />
          </div>
          <div>
            <label htmlFor="productName">Product Name</label>
            <input {...register("productName")} type="text" id="productName" />
          </div>
          <div>
            <label htmlFor="qty">qty</label>
            <input {...register("qty")} type="number" id="qty" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input {...register("price")} type="number" id="price" />
          </div>
        </div>
        <div className="form-img">
          <label htmlFor="image">Image</label>
          <img src={previewImg} alt="preview" width={200} height={200} />
          <input
            {...register("image", {
              onChange: handleChangeImage,
            })}
            accept="image/png, image/jpeg, image/jpg"
            type="file"
            id="image"
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
