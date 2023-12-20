"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 2 } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const userInteractions = await Interaction.find({ user: userId }).populate({
      path: "tags",
      model: Tag,
      select: "_id name",
    });
    // Group interactions by tags
    const tagFreqMap: { [key: string]: number } = {};
    const tagNameToIdMap: { [key: string]: any } = {};
    for (const interaction of userInteractions) {
      if (interaction && interaction.tags) {
        for (const tag of interaction.tags) {
          if (!tagNameToIdMap[tag.name]) {
            tagNameToIdMap[tag.name] = tag._id;
          }
          if (!tagFreqMap[tag.name]) {
            tagFreqMap[tag.name] = 1;
          } else {
            tagFreqMap[tag.name]++;
          }
        }
      }
    }
    // Convert grouped tags object to an array of objects
    const topInteractedTags = Object.keys(tagFreqMap).map((tagName) => ({
      _id: tagNameToIdMap[tagName],
      name: tagName,
      count: tagFreqMap[tagName],
    }));
    // Sort the tags by count in descending order
    topInteractedTags.sort((a, b) => b.count - a.count);
    return topInteractedTags
      .filter((tag) => ({
        _id: tag._id,
        name: tag.name,
      }))
      .slice(0, limit);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 }; // Sorting by number of questions in descending order
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }
    if (filter === "popular") {
      const totalTags = await Tag.aggregate([
        {
          $match: query,
        },
        {
          $project: {
            name: 1,
            description: 1,
            followers: 1,
            createdOn: 1,
            questions: 1,
            questionsCount: { $size: "$questions" }, // Counting the number of questions for each tag
          },
        },
        {
          $sort: { questionsCount: -1 }, // Sorting based on the number of questions in descending order
        },
        {
          $skip: skipAmount,
        },
        {
          $limit: pageSize,
        },
      ]);
      const isNext = totalTags.length > skipAmount + pageSize;
      return { tags: totalTags, isNext };
    } else {
      const totalTags = await Tag.countDocuments(query);
      const tags = await Tag.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);
      const isNext = totalTags > skipAmount + tags.length;
      return { tags, isNext };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!tag) {
      throw new Error("Tag not found");
    }
    const isNext = tag.questions.length > pageSize;
    const questions = tag.questions;
    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
