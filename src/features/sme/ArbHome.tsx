import React from 'react';
import { useParams } from 'react-router-dom';
import ArbDashboardView from '../arb-dashboard/ArbDashboardView';

export default function ArbHome() {
    const { arbName } = useParams<{ arbName: string }>();

    // Get Guild display name
    const getArbDisplayName = (arb?: string) => {
        if (!arb) return 'Guild';
        const names: Record<string, string> = {
            'security': 'Security',
            'data': 'Data',
            'operations': 'Operations',
            'enterprise_architecture': 'Enterprise Architecture',
        };
        return names[arb] || arb;
    };

    if (!arbName) {
        return null;
    }

    const displayName = getArbDisplayName(arbName);

    return <ArbDashboardView arbDomain={arbName} domainDisplayName={displayName} />;
}
