import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import { useCreateApp } from '../../api/hooks';

/**
 * Modal dialog to create a new application.
 * Accepts an optional onSuccess callback to perform navigation.
 */
export default function AddApplicationDialog({
                                                 open,
                                                 onClose,
                                                 onSuccess,
                                             }: {
    open: boolean;
    onClose: () => void;
    onSuccess?: (appId: string) => void;
}) {
    const [appId, setAppId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const create = useCreateApp();

    const handleCreate = async () => {
        if (!appId) return;
        setError(null);
        try {
            await create.mutateAsync(appId);
            if (onSuccess) {
                onSuccess(appId);  // invoke callback for navigation
            }
            onClose();
            setAppId('');
        } catch (e: any) {
            setError(
                e?.response?.data?.message ||
                e?.message ||
                'Failed to create application',
            );
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Add New Application</DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <TextField
                    label="Application ID"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    required
                    fullWidth
                    autoFocus
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={!appId || create.isLoading}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
