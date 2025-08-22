import React, { useMemo, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from '@mui/material';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { useCreateEvidence } from '../../api/hooks';

import linkSchema from '../../schemas/evidence/link.schema.json';
import fileSchema from '../../schemas/evidence/file.schema.json';
import assertionSchema from '../../schemas/evidence/assertion.schema.json';

const linkUi = { type: 'VerticalLayout', elements: [
  { type: 'Control', scope: '#/properties/fieldKey' },
  { type: 'Control', scope: '#/properties/type' },
  { type: 'Control', scope: '#/properties/uri' },
  { type: 'Control', scope: '#/properties/validFrom' },
  { type: 'Control', scope: '#/properties/validUntil' },
] };

export default function EvidenceFormDialog({ appId, open, onClose }: { appId: string; open: boolean; onClose: () => void }) {
  const [data, setData] = useState<any>({ type: 'link' });
  const [error, setError] = useState<string|undefined>();
  const create = useCreateEvidence(appId);

  const { schema, uischema } = useMemo(() => {
    if (data?.type === 'file') return { schema: fileSchema, uischema: linkUi };
    if (data?.type === 'assertion') return { schema: assertionSchema, uischema: linkUi };
    return { schema: linkSchema, uischema: linkUi };
  }, [data?.type]);

  const handleSubmit = async () => {
    setError(undefined);
    try {
      await create.mutateAsync(data);
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.detail || e.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Evidence</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <JsonForms
          schema={schema as any}
          uischema={uischema as any}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
