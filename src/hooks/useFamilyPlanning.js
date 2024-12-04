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
    spacingReason: false,
    medicalCondition: false,
    sideEffects: false,
    limitingReason: false,
    otherReason: false,
    // Method Currently Used
    coc: false,
    pop: false,
    injectable: false,
    implant: false,
    inteval: false,
    postPartum: false,
    condom: false,
    bomCmm: false,
    bbt: false,
    stm: false,
    lam: false,
    otherMethod: false,
    // VAW Risks
    unpleasantRelationship: false,
    partnerDisapproval: false,
    domesticViolence: false,
    referredToDSWD: false,
    referredToWCPU: false,
    referredToOthers: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createNewFamilyPlanning = async (payload, userId) => {
    try {
      const formData = {
        userId: userId,
        nurseIncharge: user?.id,
        ...payload
      }
      setIsLoading(true);
      const response = await axios.post(FAMILY_PLANNING, formData);
      console.log(response.data);
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