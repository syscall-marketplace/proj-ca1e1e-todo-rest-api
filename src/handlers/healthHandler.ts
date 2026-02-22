import { Request, Response } from 'express';
import { ApiResponse } from '../types/index.js';

interface HealthData {
  status: string;
  service: string;
  timestamp: Date;
}

export function healthCheck(_req: Request, res: Response): void {
  const response: ApiResponse<HealthData> = {
    success: true,
    data: {
      status: 'healthy',
      service: 'todo-api',
      timestamp: new Date(),
    },
  };
  res.status(200).json(response);
}
