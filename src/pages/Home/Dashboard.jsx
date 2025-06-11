import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuCirclePlus, LuLoader, LuRefreshCw } from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllResumes = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) setRefreshing(true);
      setError(null);
      
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data.resumes);
    } catch (error) {
      console.error("Error fetching resumes: ", error);
      setError("Failed to load resumes. Please try again.");
    } finally {
      setLoading(false);
      if (showRefreshLoader) setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchAllResumes(true);
  };

  const handleCreateSuccess = () => {
    setOpenCreateModal(false);
    fetchAllResumes(true);
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const renderCreateCard = () => (
    <div
      className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer transition-all duration-200 hover:shadow-md group"
      onClick={() => setOpenCreateModal(true)}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl group-hover:bg-purple-300/70 group-hover:scale-110 transition-all duration-200">
        <LuCirclePlus className="text-xl text-purple-500 group-hover:text-purple-600" />
      </div>
      <h3 className="font-medium text-gray-800 group-hover:text-gray-900">
        Add New Resume
      </h3>
    </div>
  );

  const renderLoadingState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <LuLoader className="text-4xl text-purple-500 animate-spin mb-4" />
      <p className="text-gray-600">Loading your resumes...</p>
    </div>
  );

  const renderErrorState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <div className="text-red-500 mb-4">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
      >
        <LuRefreshCw className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
        Try Again
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        Create your first resume to get started with building your professional profile.
      </p>
      <button
        onClick={() => setOpenCreateModal(true)}
        className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
      >
        <LuCirclePlus className="text-sm" />
        Create Your First Resume
      </button>
    </div>
  );

  const renderResumeGrid = () => {
    if (loading) return renderLoadingState();
    if (error) return renderErrorState();
    if (!allResumes || allResumes.length === 0) return renderEmptyState();

    return (
      <>
        {renderCreateCard()}
        {allResumes.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            title={resume.title}
            lastUpdated={
              resume?.updatedAt
                ? moment(resume.updatedAt).format("Do MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="pt-1 pb-6 px-4 md:px-0">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            {allResumes && allResumes.length > 0 && (
              <p className="text-gray-600 mt-1">
                {allResumes.length} resume{allResumes.length !== 1 ? 's' : ''} created
              </p>
            )}
          </div>
          
          {allResumes && allResumes.length > 0 && (
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh resumes"
            >
              <LuRefreshCw className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7">
          {renderResumeGrid()}
        </div>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateResumeForm onSuccess={handleCreateSuccess} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;