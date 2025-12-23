import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const AttendanceContext = createContext();

export const useAttendance = () => {
    return useContext(AttendanceContext);
};

const AttendanceProvider = ({ children }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        const storedRecords = getLocalStorage('attendance');
        if (storedRecords) {
            setAttendanceRecords(storedRecords);
        }
    }, []);

    const markAttendance = (employeeId, type, tagId = 'SCAN_SIM_88x2') => {
        const timestamp = new Date().toISOString();
        const date = new Date().toLocaleDateString();

        setAttendanceRecords(prev => {
            let updatedRecords = [...prev];

            // Find today's record for this employee
            const existingRecordIndex = updatedRecords.findIndex(
                r => r.employeeId === employeeId && r.date === date
            );

            if (existingRecordIndex > -1) {
                // Update existing record
                if (type === 'out' && !updatedRecords[existingRecordIndex].outTime) {
                    updatedRecords[existingRecordIndex] = {
                        ...updatedRecords[existingRecordIndex],
                        outTime: timestamp,
                        outTagId: tagId
                    };
                }
            } else {
                // New record for today (Check In)
                if (type === 'in') {
                    updatedRecords.push({
                        id: `ATT-${Date.now()}`,
                        employeeId,
                        date,
                        inTime: timestamp,
                        inTagId: tagId,
                        outTime: null,
                        outTagId: null,
                        method: 'NFC/RFID Simulation'
                    });
                }
            }

            setLocalStorage('attendance', updatedRecords);
            return updatedRecords;
        });
    };

    const getEmployeeAttendance = (employeeId) => {
        return attendanceRecords
            .filter(r => r.employeeId === employeeId)
            .sort((a, b) => new Date(b.inTime) - new Date(a.inTime));
    };

    const getTodayStatus = (employeeId) => {
        const date = new Date().toLocaleDateString();
        const record = attendanceRecords.find(r => r.employeeId === employeeId && r.date === date);
        if (!record) return 'not_marked';
        if (record.inTime && !record.outTime) return 'checked_in';
        if (record.inTime && record.outTime) return 'checked_out';
        return 'not_marked';
    };

    return (
        <AttendanceContext.Provider value={{ 
            attendanceRecords, 
            markAttendance, 
            getEmployeeAttendance, 
            getTodayStatus 
        }}>
            {children}
        </AttendanceContext.Provider>
    );
};

export default AttendanceProvider;
