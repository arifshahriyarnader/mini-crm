import InteractionLog, { IInteractionLog } from '../models/interactionlog.model';

interface CreateInteractionLogInput {
  clientId: string;
  projectId: string;
  date: string;
  interactionType: 'call' | 'email' | 'meeting';
  notes: string;
}

export const createInterActionLog = async (data: CreateInteractionLogInput) => {
  const { clientId, projectId, date, interactionType, notes } = data;
  const newLog = new InteractionLog({
    client: clientId,
    project: projectId,
    date,
    interactionType,
    notes,
  });
  return await newLog.save();
};

export const getInteractionLogsByClientAndProject = async (clientId: string, projectId: string) => {
  if (!clientId || !projectId) {
    throw new Error('Both clientId and projectId are required');
  }
  const logs = await InteractionLog.find({ client: clientId, project: projectId }).sort({
    date: -1,
  });
  return logs;
};
