import React from 'react';
import {
    Box,
    Stack,
    Typography,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
} from '@mui/material';
import {
    VerifiedUser as AttestIcon,
    SelectAll as SelectAllIcon,
} from '@mui/icons-material';

interface BulkAttestationToolbarProps {
    selectedCount: number;
    totalCount: number;
    pendingCount: number;
    isAllSelected: boolean;
    isSomeSelected: boolean;
    onSelectAll: () => void;
    onSelectNone: () => void;
    onBulkAttest: () => void;
    filterStatus: 'all' | 'pending' | 'approved' | 'rejected';
    onFilterStatusChange: (status: 'all' | 'pending' | 'approved' | 'rejected') => void;
    domainName: string;
}

export default function BulkAttestationToolbar({
    selectedCount,
    totalCount,
    pendingCount,
    isAllSelected,
    isSomeSelected,
    onSelectAll,
    onSelectNone,
    onBulkAttest,
    filterStatus,
    onFilterStatusChange,
    domainName,
}: BulkAttestationToolbarProps) {
    const handleSelectAllChange = () => {
        if (isAllSelected) {
            onSelectNone();
        } else {
            onSelectAll();
        }
    };

    return (
        <Box sx={{ 
            p: 2, 
            bgcolor: 'background.paper', 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1
        }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                {/* Left side: Selection controls */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Checkbox
                        checked={isAllSelected}
                        indeterminate={isSomeSelected && !isAllSelected}
                        onChange={handleSelectAllChange}
                        size="small"
                    />
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            {selectedCount > 0 ? (
                                <span>
                                    <strong>{selectedCount}</strong> of {totalCount} selected
                                </span>
                            ) : (
                                `${totalCount} fields in ${domainName}`
                            )}
                        </Typography>
                        
                        {pendingCount > 0 && (
                            <Chip
                                size="small"
                                label={`${pendingCount} pending`}
                                color="warning"
                                variant="outlined"
                            />
                        )}
                    </Stack>
                </Stack>

                {/* Right side: Actions and filters */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Show</InputLabel>
                        <Select
                            value={filterStatus}
                            label="Show"
                            onChange={(e) => onFilterStatusChange(e.target.value as any)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="approved">Approved</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    {selectedCount > 0 && (
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<SelectAllIcon />}
                                onClick={onSelectNone}
                            >
                                Clear Selection
                            </Button>
                            
                            <Button
                                size="small"
                                variant="contained"
                                startIcon={<AttestIcon />}
                                onClick={onBulkAttest}
                                color="primary"
                            >
                                Bulk Attest ({selectedCount})
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}