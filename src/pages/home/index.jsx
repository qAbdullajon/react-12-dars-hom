import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";

const index = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [user, setUser] = useState({});
  const getProducts = () => {
    axios.get("http://localhost:3000/products").then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`).then((res) => {
      if (res.status === 200) {
        getProducts();
      }
    });
  };
  const addProdcts = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (Object.keys(form).length > 0) {
      if (Object.keys(user).length > 0) {
        axios
          .put(`http://localhost:3000/products/${user.id}`, form)
          .then((res) => {
            getProducts();
            setForm({});
            setUser({});
            setOpen(false);
          });
      } else {
        axios.post("http://localhost:3000/products", form).then((res) => {
          if (res.status === 201) {
            getProducts();
            setOpen(false);
            setForm({});
          }
        });
      }
    }
    // else if ((Object.keys(user).length = 0)) {
    //   console.log(form.id);
    // } else {
    //   if (Object.keys(form).length > 0) {
    //
    //   }
    // }
  }, [form]);
  const handleEdite = (product) => {
    setOpen(true);
    setUser(product);
  };
  return (
    <div className="px-[7%] pt-6">
      <Modal
        open={open}
        toggle={setOpen}
        form={form}
        setForm={setForm}
        user={user}
        setUser={setUser}
      />
      <div>
        <button
          onClick={addProdcts}
          className="bg-blue-600 px-5 py-1 text-xl text-white rounded"
        >
          Add Products
        </button>
      </div>
      <table className="w-full mt-6">
        <thead>
          <tr>
            <th className="border">T/H</th>
            <th className="border">Name</th>
            <th className="border">Color</th>
            <th className="border">Price</th>
            <th className="border">Year</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td className="border text-center">{i + 1}</td>
                <td className="border text-center">{item.name}</td>
                <td className="border text-center">{item.color}</td>
                <td className="border text-center">{item.price}</td>
                <td className="border text-center">{item.year}</td>
                <td className="border text-center flex gap-3 justify-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 px-3 text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdite(item)}
                    className="bg-orange-400 px-3 text-white"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default index;
