"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;
    // Update view count for the question
    const question = await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });
    if (question.views % 100 === 0) {
      // Increment author's reputation by +1 for every 100 question views
      await User.findByIdAndUpdate(question.author, {
        $inc: { reputation: 1 },
      });
    }
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteraction) {
        return;
      }
      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
