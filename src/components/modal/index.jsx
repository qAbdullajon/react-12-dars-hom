import axios from "axios";
import { nanoid } from "nanoid";
import React, { useState, useRef } from "react";
import { Modal } from "reactstrap";

const index = (props) => {
  const { open, toggle, form, setForm, user, setUser } = props;
  const nameRef = useRef();
  const colorRef = useRef();
  const priceRef = useRef();
  const yearRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({
      id: nanoid(),
      name: nameRef.current.value,
      color: colorRef.current.value,
      price: priceRef.current.value,
      year: yearRef.current.value,
    });
  };
  return (
    <Modal
      onClick={() => {
        toggle(false);
        setUser({});
      }}
      isOpen={open}
      toggle={toggle}
      className="h-[100vh] w-full fixed top-0 flex justify-center items-center left-0 bg-gray-400 bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-3 w-[400px] rounded-lg bg-white"
      >
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-3xl">Modal</h2>
          <button
            onClick={() => {
              toggle(false);
              setUser({});
            }}
            className="bg-red-600 text-white text-xl w-8 h-8 flex justify-center items-center rounded"
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <input
            ref={nameRef}
            defaultValue={user.name}
            className="border px-2 py-1 text-xl outline-none w-full"
            type="text"
            placeholder="Name"
          />
          <input
            ref={colorRef}
            defaultValue={user.color}
            className="border px-2 py-1 text-xl outline-none w-full"
            type="text"
            placeholder="Color"
          />
          <input
            ref={priceRef}
            defaultValue={user.price}
            className="border px-2 py-1 text-xl outline-none w-full"
            type="number"
            placeholder="Price"
          />
          <input
            ref={yearRef}
            defaultValue={user.year}
            className="border px-2 py-1 text-xl outline-none w-full"
            type="number"
            placeholder="Year"
          />
          <button className="bg-green-600 text-white py-1 text-xl rounded">
            Button
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default index;
