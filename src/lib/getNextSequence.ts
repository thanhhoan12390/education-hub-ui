import { CounterModel } from '~/models/CounterModel';

export async function getNextSequence(name: string) {
    const counter = await CounterModel.findByIdAndUpdate(
        name, // ví dụ: 'courseId'
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true },
    );
    return counter.sequence_value;
}
