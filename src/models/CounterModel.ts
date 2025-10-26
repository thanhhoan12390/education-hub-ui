import mongoose, { Schema, models } from 'mongoose';

interface Counter {
    _id: string;
    sequence_value: number;
}

const CounterSchema = new Schema<Counter>({
    _id: { type: String, required: true },
    sequence_value: { type: Number, required: true },
});

export const CounterModel = models.Counter || mongoose.model<Counter>('Counter', CounterSchema);
