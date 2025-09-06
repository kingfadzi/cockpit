import { useState, useMemo, useCallback } from 'react';
import type { ProfileField } from '../../../api/types';

export interface BulkAttestationState {
    selectedFieldIds: Set<string>;
    selectedFields: ProfileField[];
    isAllSelected: boolean;
    isSomeSelected: boolean;
    selectedCount: number;
    eligibleCount: number;
}

export interface BulkAttestationActions {
    selectField: (fieldId: string) => void;
    deselectField: (fieldId: string) => void;
    selectAll: () => void;
    selectNone: () => void;
    toggleField: (fieldId: string) => void;
    isFieldSelected: (fieldId: string) => boolean;
}

export function useBulkAttestation(
    fields: ProfileField[],
    eligibleForAttestation?: (field: ProfileField) => boolean
) {
    // Default eligibility function - simple check for pending status with evidence
    const defaultEligibilityFn = useCallback((field: ProfileField) => {
        return field.approvalStatus === 'pending' && (field.evidence?.length || 0) > 0;
    }, []);
    
    const eligibilityFn = eligibleForAttestation || defaultEligibilityFn;
    const [selectedFieldIds, setSelectedFieldIds] = useState<Set<string>>(new Set());

    // Memoized eligible fields (fields that can be attested)
    const eligibleFields = useMemo(() => 
        fields.filter(eligibilityFn),
        [fields, eligibilityFn]
    );

    // Memoized selected fields
    const selectedFields = useMemo(() => 
        fields.filter(field => selectedFieldIds.has(field.profileFieldId)),
        [fields, selectedFieldIds]
    );

    // Selection state calculations
    const state = useMemo<BulkAttestationState>(() => {
        const selectedCount = selectedFieldIds.size;
        const eligibleCount = eligibleFields.length;
        const isAllSelected = eligibleCount > 0 && selectedCount === eligibleCount && 
            eligibleFields.every(field => selectedFieldIds.has(field.profileFieldId));
        const isSomeSelected = selectedCount > 0 && !isAllSelected;

        return {
            selectedFieldIds,
            selectedFields,
            isAllSelected,
            isSomeSelected,
            selectedCount,
            eligibleCount,
        };
    }, [selectedFieldIds, selectedFields, eligibleFields]);

    // Actions
    const actions = useMemo<BulkAttestationActions>(() => ({
        selectField: (fieldId: string) => {
            setSelectedFieldIds(prev => new Set(prev).add(fieldId));
        },

        deselectField: (fieldId: string) => {
            setSelectedFieldIds(prev => {
                const next = new Set(prev);
                next.delete(fieldId);
                return next;
            });
        },

        selectAll: () => {
            const allEligibleIds = eligibleFields.map(field => field.profileFieldId);
            setSelectedFieldIds(new Set(allEligibleIds));
        },

        selectNone: () => {
            setSelectedFieldIds(new Set());
        },

        toggleField: (fieldId: string) => {
            setSelectedFieldIds(prev => {
                const next = new Set(prev);
                if (next.has(fieldId)) {
                    next.delete(fieldId);
                } else {
                    next.add(fieldId);
                }
                return next;
            });
        },

        isFieldSelected: (fieldId: string) => {
            return selectedFieldIds.has(fieldId);
        },
    }), [selectedFieldIds, eligibleFields]);

    // Helper functions
    const canFieldBeSelected = useCallback((field: ProfileField) => {
        return eligibilityFn(field);
    }, [eligibilityFn]);

    const getFieldSelectionStatus = useCallback((field: ProfileField) => {
        if (!canFieldBeSelected(field)) {
            return 'disabled';
        }
        return selectedFieldIds.has(field.profileFieldId) ? 'selected' : 'unselected';
    }, [selectedFieldIds, canFieldBeSelected]);

    // Reset function for clearing all selections
    const reset = useCallback(() => {
        setSelectedFieldIds(new Set());
    }, []);

    return {
        ...state,
        ...actions,
        eligibleFields,
        canFieldBeSelected,
        getFieldSelectionStatus,
        reset,
    };
}

export default useBulkAttestation;