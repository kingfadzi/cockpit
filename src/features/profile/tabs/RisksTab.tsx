import React, { useState } from 'react';
import {
    Stack,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { useRiskCategories } from '../../../api/hooks';
import { RiskItem } from '../../../api/types';
import CategoryRow from '../../risks/components/CategoryRow';
import RiskItemsRows from '../../risks/components/RiskItemsRows';
import CategorySummaryCards from '../../risks/components/CategorySummaryCards';
import RiskItemModal from '../../risks/components/RiskItemModal';

interface RisksTabProps {
    appId: string;
    userRole?: string;
}

export default function RisksTab({ appId }: RisksTabProps) {
    const { data: categoriesData, isLoading, isError } = useRiskCategories(appId);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [selectedRiskItem, setSelectedRiskItem] = useState<RiskItem | null>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    console.log('[RisksTab] Rendering with:', { appId, isLoading, isError, categoriesData });

    const handleToggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const handleRiskItemClick = (item: RiskItem) => {
        setSelectedRiskItem(item);
        setDetailsModalOpen(true);
    };

    const handleCloseModal = () => {
        setDetailsModalOpen(false);
        setSelectedRiskItem(null);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <Stack spacing={2} alignItems="center">
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary">
                        Loading risk categories...
                    </Typography>
                </Stack>
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                Error loading risk categories. Please try again later.
            </Alert>
        );
    }

    if (!categoriesData || categoriesData.categories.length === 0) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                No risks found for this application.
            </Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {/* Summary Cards */}
            <CategorySummaryCards summary={categoriesData.summary} />

            {/* Master-Detail Table */}
            <Paper variant="outlined">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: 50 }}></TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Risk Category
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Items
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Severity
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Assigned SME
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoriesData.categories.map((category) => (
                                <React.Fragment key={category.riskCategoryId}>
                                    {/* Parent Row - Category */}
                                    <CategoryRow
                                        category={category}
                                        expanded={expandedCategories.has(category.riskCategoryId)}
                                        onToggle={() => handleToggleCategory(category.riskCategoryId)}
                                    />

                                    {/* Child Rows - Risk Items (if expanded) */}
                                    {expandedCategories.has(category.riskCategoryId) && (
                                        <RiskItemsRows
                                            categoryId={category.riskCategoryId}
                                            onItemClick={handleRiskItemClick}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Risk Item Detail Modal */}
            <RiskItemModal
                open={detailsModalOpen}
                onClose={handleCloseModal}
                riskItem={selectedRiskItem}
            />
        </Stack>
    );
}
