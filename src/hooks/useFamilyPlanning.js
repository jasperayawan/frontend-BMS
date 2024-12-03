import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FAMILY_PLANNING } from "../helper/api";
import Parse from 'parse/dist/parse.min.js'

export const useFamilyPlanning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [familyPlanningData, setFamilyPlanningData] = useState(null);
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
      setFamilyPlanningData(response.data.record);
      return response.data.record;
    } catch (error) {
      console.error('Error fetching family planning records:', error);
      toast.error('Failed to fetch family planning records');
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
    fetchFamilyPlanningByUserId
  };
};