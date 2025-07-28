import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../Elements/Button/Index";
import Table from "../../Fragments/Admin/Table";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import Pagination from "../../Fragments/Global/Pagination";
import Modal from "../../Fragments/Global/Modal";
import Form from "../../Fragments/Admin/Form";
import ConfirmMessage from "../../Fragments/Global/ConfirmMessage";
import Card from "../../Fragments/Global/Card";
import Loader from "../../Fragments/Global/Loader";
import { apiCall } from "../../../utils/api";
import Alert from "../../Fragments/Global/Alert";

const CategoryLayouts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    dataId: null,
  });

  const [dataDetail, setDataDetail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const token = ""; 


  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const showTempAlert = (msg, type = "success") => {
    setAlert({
      show: true,
      message: msg,
      headerMessage: type === "success" ? "Success!" : "Failed!",
      style: `text-${type === "success" ? "green" : "red"}-700 bg-${type === "success" ? "green" : "red"}-200 border-${type === "success" ? "green" : "red"}-400 w-96`,
    });
    setTimeout(() => setAlert({ show: false, message: "" }), 3000);
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
      setCategories(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (value) => setSearchTerm(value);

  const filteredData = categories
    ?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (profilePictureFile) {
        const isImage = profilePictureFile.type.startsWith("image/");
        if (!isImage) return showTempAlert("Files that are allowed are only of type Image", "error");
        if (profilePictureFile.size > 500 * 1024) return showTempAlert("File size exceeds 500 kb", "error");

        const data = new FormData();
        data.append("image", profilePictureFile);
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/upload-image`, data);
        imageUrl = res.data.imageUrl;

      }


      const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/create-category`, {
        name: formData.name || "",
        imageUrl,
      });

      showTempAlert(res.data.message, "success");
      setShowModalAdd(false);
      fetchCategories();
    } catch (error) {
      showTempAlert(error.message, "error");
    }
  };

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/delete-category/${deleteItemId}`);
      showTempAlert(res.data.message, "success");
      fetchCategories();
    } catch (error) {
      showTempAlert(error.message, "error");
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;

      if (profilePictureFile) {
        const isImage = profilePictureFile.type.startsWith("image/");
        if (!isImage) return showTempAlert("Files that are allowed are only of type Image", "error");
        if (profilePictureFile.size > 500 * 1024) return showTempAlert("File size exceeds 500 kb", "error");

        const data = new FormData();
        data.append("image", profilePictureFile);
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/upload-image`, data);
        imageUrl = res.data.imageUrl; 

      }

      const res = await axios.put(`${import.meta.env.VITE_BACKEND_LINK}/api/update-category/${formData.dataId}`, {
        name: formData.name,
        imageUrl,
      });

      showTempAlert(res.data.message, "success");
      fetchCategories();
      setShowModalEdit(false);
    } catch (error) {
      showTempAlert(error.message, "error");
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewData = async (id) => {
    try {
      setLoadingForm(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/category/${id}`);
      setFormData({
        name: res.data.data.name,
        imageUrl: res.data.data.imageUrl,
        dataId: id,
      });
      setShowModalEdit(true);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleViewDetail = async (id) => {
    setShowModalDetails(true);
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/category/${id}`);
    setDataDetail(res.data);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AdminLayouts>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">Categories</p>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title="Manage Categories"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          button={
            <Button
              classname="py-[4px] px-2 bg-green-500"
              onClick={() => {
                setFormData({ name: "", imageUrl: "", dataId: null });
                setShowModalAdd(true);
              }}
            >
              Add Category
            </Button>
          }
        >
          <Table
            column={[
              { title: "Name", column: "name" },
              { title: "Created At", column: "createdAt" },
              { title: "Updated At", column: "updatedAt" },
              {
                title: "Actions",
                column: "actions",
                useTemplate: true,
                Template: ({ keyIndex, dataId }) => (
                  <td key={keyIndex} className="flex gap-2 px-4 py-2 border-b border-b-gray-50">
                    <button className="py-[4px] px-2 bg-blue-400 rounded" onClick={() => handleViewDetail(dataId)}>View</button>
                    <button className="py-[4px] px-2 bg-orange-400 rounded" onClick={() => handleViewData(dataId)}>Edit</button>
                    <button className="py-[4px] px-2 bg-red-500 rounded" onClick={() => handleDelete(dataId)}>Delete</button>
                  </td>
                ),
              },
            ]}
            data={filteredData.map((item) => ({
              ...item,
               dataId: item._id,
              createdAt: formatDate(item.createdAt),
              updatedAt: formatDate(item.updatedAt),
            }))}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </TableLayouts>
      )}

      {/* Modals */}
      <Modal classname="w-[80%] md:w-[40%]" isVisible={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <h2 className="mb-4 text-lg font-semibold">Add Category</h2>
        <Form
          onSubmit={handleSubmit}
          onChangeName={(e) => setFormData({ ...formData, name: e.target.value })}
          onChangePicture={(e) => {
            setProfilePictureName(e.target.value);
            setProfilePictureFile(e.target.files[0]);
          }}
          placeholderName="Input category name ..."
          placeholderImageUrl="Input category image url ..."
        />
      </Modal>

      <Modal classname="w-[80%] md:w-[40%]" isVisible={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <h2 className="mb-4 text-lg font-semibold">Edit Category</h2>
        {loadingForm ? (
          <Loader classname="w-12 h-12" />
        ) : (
          <Form
            onSubmit={handleUpdate}
            onChangeName={(e) => setFormData({ ...formData, name: e.target.value })}
            onChangePicture={(e) => {
              setProfilePictureName(e.target.value);
              setProfilePictureFile(e.target.files[0]);
            }}
            showFormCategory={true}
            valueName={formData.name}
            valueImageUrl={formData.imageUrl}
            dataId={formData.dataId}
            placeholderName="Input category name ..."
            placeholderImageUrl="Input category image url ..."
          />
        )}
      </Modal>

      <Modal classname="w-[80%] md:w-[40%]" isVisible={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
        <ConfirmMessage
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete this item?"
          confirmText="Delete"
          onClose={() => setShowDeleteConfirmation(false)}
        />
      </Modal>

      <Modal classname="w-[80%] md:w-[40%]" isVisible={showModalDetails} onClose={() => setShowModalDetails(false)}>
        {!dataDetail ? (
          <Loader classname="w-12 h-12" />
        ) : (
          <Card
            src={dataDetail.data.imageUrl}
            bannerName={dataDetail.data.name}
            alt={dataDetail.data.name}
            showDetailsBanner={true}
            createdAt={formatDate(dataDetail.data.createdAt)}
            updatedAt={formatDate(dataDetail.data.updatedAt)}
          />
          
        )}
      </Modal>
    </AdminLayouts>
  );
};

export default CategoryLayouts;
