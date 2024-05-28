import React, { useState, useMemo, useEffect } from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import {ProtectedRoute} from "../../../routes/ProtectedRoute";
import * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  skuCode: z.string().min(1, { message: "SKU Code is required" }),
  productName: z.string().min(1, { message: "Product Name is required" }),
  price: z
    .string()
    .refine((val) => !isNaN(parseInt(val)), "price must be a number")
    .transform((val) => parseInt(val))
    .refine((val) => val >= 0, "price must be greater than 0"),
  qty: z
    .string()
    .refine((val) => !isNaN(parseInt(val)), "stock must be a number")
    .transform((val) => parseInt(val))
    .refine((val) => val >= 0, "stock must be greater than 0"),
  image: z
    .any()
    .refine(
      (files) =>
        files.length !== 0 &&
        ["image/png", "imgae/jpg", "image/jpeg"].includes(files[0].type),
      "Content must be an image"
    ),
});
const ProductForm = () => {
  const { register, handleSubmit, clearErrors, reset, setValue, formState:{errors,isValid} } = useForm({
    mode: "onChange", resolver: zodResolver(schema),
  });
  const [previewImg, setPreviewImg] = useState(
    "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"  );

  const { id } = useParams();
  const [title, setTitle] = useState("Add a New Product");
  const [button, setButton] = useState("Create");
  const productService = useMemo(() => ProductService(), []);
  const navigate = useNavigate();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewImg(url);
  };

  const generateSkuCode = () => {
    return "SKU_" + Math.random().toString(20).substring(2, 10) + Math.random().toString(10).substring(2, 10);
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
    if (!id) {
      setValue("skuCode", generateSkuCode());
    } else {
      getProduct();
      setTitle("Edit Product");
      setButton("Update");
    }
  }, [id, setValue, productService]);

  return (
    <ProtectedRoute>
    <div className="product-form">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-body">
          <div>
            <label htmlFor="skuCode">SKU Code</label>
            <input {...register("skuCode")} type="text" id="skuCode" disabled />
            {errors.skuCode && <p className="error">{errors.skuCode.message}</p>}
          </div>
          <div>
            <label htmlFor="productName">Product Name</label>
            <input {...register("productName")} type="text" id="productName" />
            {errors.productName && <p className="error">{errors.productName.message}</p>}
          </div>
          <div>
            <label htmlFor="qty">qty</label>
            <input {...register("qty")} type="number" id="qty" />
            {errors.qty && <p className="error">{errors.qty.message}</p>}
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input {...register("price")} type="number" id="price" />
            {errors.price && <p className="error">{errors.price.message}</p>}
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
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        <button type="submit" className={`${!isValid ? "disabled" : ""}`} disabled={!isValid}>
          {button}
        </button>
      </form>
    </div>
    </ProtectedRoute>
  );
};

export default ProductForm;
