import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../Elements/Button/Index";
import Table from "../../Fragments/Admin/Table";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import Pagination from "../../Fragments/Global/Pagination";
import Modal from "../../Fragments/Global/Modal";
import ConfirmMessage from "../../Fragments/Global/ConfirmMessage";
import Card from "../../Fragments/Global/Card";
import Loader from "../../Fragments/Global/Loader";
import { useNavigate } from "react-router-dom";
import Alert from "../../Fragments/Global/Alert";

const PromoLayouts = () => {
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [promoData, setPromoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", headerMessage: "", style: "" });

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/promos`);
      setPromoData(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch promos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleAddData = () => navigate("/addPromo");

  const handleEditData = (id) => navigate(`/editPromo/${id}`);

  const handleViewDetail = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/promo/${id}`);
      setSelectedPromo(res.data.data);
      setShowModalDetails(true);
    } catch (err) {
      console.error("Failed to fetch promo detail:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/delete-promo/${deleteItemId}`);
      setShowDeleteConfirmation(false);
      fetchPromos();
      setAlert({
        show: true,
        message: "Promo deleted successfully.",
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });
    } catch (err) {
      console.error("Delete failed:", err);
      setAlert({
        show: true,
        message: "Failed to delete promo.",
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
    } finally {
      setTimeout(() => {
        setAlert({ show: false, message: "" });
      }, 3000);
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const filteredData = promoData.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayouts>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}

      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">Promos</p>

      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title="Manage Promos"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          button={
            <Button classname="py-[4px] px-2 bg-green-500" onClick={handleAddData}>
              Add Promo
            </Button>
          }
        >
          {paginatedData.length > 0 ? (
            <Table
              column={[
                { title: "Title", column: "title" },
                { title: "Promo Code", column: "promo_code" },
                { title: "Created At", column: "createdAt" },
                { title: "Updated At", column: "updatedAt" },
                {
                  title: "Actions",
                  column: "actions",
                  useTemplate: true,
                  Template: ({ keyIndex, dataId }) => (
                    <td key={keyIndex} className="flex gap-2 px-4 py-2 border-b border-b-gray-50">
                      <button
                        className="py-[4px] px-2 bg-blue-400 rounded"
                        onClick={() => handleViewDetail(dataId)}
                      >
                        View
                      </button>
                      <button
                        className="py-[4px] px-2 bg-orange-400 rounded"
                        onClick={() => handleEditData(dataId)}
                      >
                        Edit
                      </button>
                      <button
                        className="py-[4px] px-2 bg-red-500 rounded"
                        onClick={() => handleDelete(dataId)}
                      >
                        Delete
                      </button>
                    </td>
                  ),
                },
              ]}
              data={paginatedData.map((v) => ({
                ...v,
                 dataId: v._id,
                createdAt: formatDate(v.createdAt),
                updatedAt: formatDate(v.updatedAt),
                title: v.title.split(" ")[0],
              }))}
            />
          ) : (
            <p className="text-center">No data available</p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </TableLayouts>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        classname="w-[80%] md:w-[40%]"
        isVisible={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <ConfirmMessage
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete this item?"
          confirmText="Delete"
          onClose={() => setShowDeleteConfirmation(false)}
        />
      </Modal>

      {/* Details Modal */}
      <Modal
        classname="w-[90%] md:w-[50%]"
        isVisible={showModalDetails}
        onClose={() => setShowModalDetails(false)}
      >
        {loading ? (
          <Loader />
        ) : (
          selectedPromo && (
            <Card
              showDetailsPromo={true}
              title={selectedPromo.title}
              // src={selectedPromo.imageUrl}
              src={`${import.meta.env.VITE_BACKEND_LINK}${selectedPromo.imageUrl}`}
              alt={selectedPromo.title}
              description={selectedPromo.description}
              terms_condition={selectedPromo.terms_condition}
              createdAt={selectedPromo.createdAt}
              updatedAt={selectedPromo.updatedAt}
              promo_code={selectedPromo.promo_code}
              promo_discount_price={selectedPromo.promo_discount_price}
              minimum_claim_price={selectedPromo.minimum_claim_price}
            />
          )
        )}
      </Modal>
    </AdminLayouts>
  );
};

export default PromoLayouts;

