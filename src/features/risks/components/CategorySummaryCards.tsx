import React from 'react';
import { Grid, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import {
    Error as CriticalIcon,
    Warning as HighIcon,
    Info as MediumIcon,
    CheckCircle as LowIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';

interface CategorySummaryCardsProps {
    summary?: {
        totalCategories: number;
        totalRiskItems: number;
        criticalCount: number;
        highCount: number;
        mediumCount: number;
        lowCount: number;
    };
}

export default function CategorySummaryCards({ summary }: CategorySummaryCardsProps) {
    if (!summary) {
        return null;
    }

    const cards = [
        {
            title: 'Total Categories',
            value: summary.totalCategories,
            icon: <CategoryIcon sx={{ fontSize: 32 }} />,
            color: '#1976d2',
            bgcolor: '#e3f2fd',
        },
        {
            title: 'Critical Risks',
            value: summary.criticalCount,
            icon: <CriticalIcon sx={{ fontSize: 32 }} />,
            color: '#d32f2f',
            bgcolor: '#ffebee',
        },
        {
            title: 'High Risks',
            value: summary.highCount,
            icon: <HighIcon sx={{ fontSize: 32 }} />,
            color: '#f57c00',
            bgcolor: '#fff3e0',
        },
        {
            title: 'Medium Risks',
            value: summary.mediumCount,
            icon: <MediumIcon sx={{ fontSize: 32 }} />,
            color: '#fbc02d',
            bgcolor: '#fffde7',
        },
        {
            title: 'Low Risks',
            value: summary.lowCount,
            icon: <LowIcon sx={{ fontSize: 32 }} />,
            color: '#388e3c',
            bgcolor: '#e8f5e9',
        },
    ];

    return (
        <Grid container spacing={2}>
            {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={2.4} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Stack spacing={1.5}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        bgcolor: card.bgcolor,
                                        color: card.color,
                                    }}
                                >
                                    {card.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h4" fontWeight={600} color={card.color}>
                                        {card.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.title}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
