import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FAMILY_PLANNING } from "../helper/api";
import Parse from 'parse/dist/parse.min.js'

export const useFamilyPlanning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [familyPlanningData, setFamilyPlanningData] = useState(null);
  const [familyPlanningHistory, setFamilyPlanningHistory] = useState(null);
  const user = Parse.User.current();
  const [formData, setFormData] = useState({
    // Type of Client
    newAcceptor: false,
    currentUser: false,
    changingMethod: false,
    changingClinic: false,
    dropoutRestart: false,
    spacing: false,
    medicalCondition: false,
    sideEffects: false,
    limiting: false,
    others: '',
    // Method Currently Used
    coc: false,
    pop: false,
    injectable: false,
    implant: false,
    interval: false,
    postPartum: false,
    condom: false,
    bomCmm: false,
    bbt: false,
    stm: false,
    lam: false,
    methodOthers: '',
    // Risks
    unpleasantRelationship: false,
    partnerDisapproval: false,
    domesticViolence: false,
    dswd: false,
    wcpu: false,
    riskOthers: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked, 
      }));
    } else if (type === 'radio') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "YES",
      }));
    } else if (type === 'text' || type === 'textarea') {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Ensure that text fields are stored as strings
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  
  const createNewFamilyPlanning = async (payload, userId) => {
    try {
      // Form data with boolean conversions for radio values
      const formDataWithBooleans = {
        ...payload,
        unpleasantRelationship: payload.unpleasantRelationship === 'YES',
        partnerDisapproval: payload.partnerDisapproval === 'YES',
        domesticViolence: payload.domesticViolence === 'YES',
        others: payload.others || "",
      };
  
      const dataToSend = {
        userId: userId,
        nurseIncharge: user?.id,
        ...formDataWithBooleans,
      };
  
      setIsLoading(true);
      const response = await axios.post(FAMILY_PLANNING, dataToSend);
  
      return response.data;
    } catch (error) {
      console.error('Error creating family planning record:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  const fetchFamilyPlanningByUserId = async (userId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${FAMILY_PLANNING}/user/${userId}`);
      setFamilyPlanningData(response.data.records[0]);
      return response.data.records[0];
    } catch (error) {
      console.error('Error fetching family planning records:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFamilyPlanningByUserIdHistory = async (userId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${FAMILY_PLANNING}/user/${userId}`);
      setFamilyPlanningHistory(response.data.records);
      return response.data.records;
    } catch (error) {
      console.error('Error fetching family planning records:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFamilyPlanningById = async (planningId, payload) => {
    try {
      setIsLoading(true);
      
      const response = await axios.put(`${FAMILY_PLANNING}/${planningId}`,payload);
      toast.success('Family planning record updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating family planning record:', error);
      toast.error('Failed to update family planning record');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    familyPlanningData,
    isLoading,
    handleInputChange,
    createNewFamilyPlanning,
    fetchFamilyPlanningByUserId,
    fetchFamilyPlanningByUserIdHistory,
    familyPlanningHistory,
    updateFamilyPlanningById
  };
};