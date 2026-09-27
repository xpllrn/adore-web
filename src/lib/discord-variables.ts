export const variableGroups = {
  Server: [
    "{guild.name}",
    "{guild.id}",
    "{guild.membercount}",
    "{guild.boost_count}",
    "{guild.boost_tier}",
    "{guild.role_count}",
    "{guild.emoji_count}",
    "{guild.channels_count}",
    "{guild.owner_id}",
    "{guild.created_at}",
  ],
  Member: [
    "{user.name}",
    "{user.mention}",
    "{user.id}",
    "{user.avatar}",
    "{user.created_at}",
    "{user.joined_at}",
  ],
  Channel: ["{channel.name}", "{channel.mention}", "{channel.id}", "{channel.topic}"],
  "Date & time": ["{date}", "{time}", "{timestamp}", "{timestamp.relative}"],
};

export const sampleVariables: Record<string, string> = {
  "{guild.name}": "Adore Community",
  "{guild.id}": "120493827102",
  "{guild.membercount}": "232,375",
  "{guild.boost_count}": "48",
  "{guild.boost_tier}": "3",
  "{guild.role_count}": "36",
  "{guild.emoji_count}": "120",
  "{guild.channels_count}": "42",
  "{guild.owner_id}": "1029384756",
  "{guild.created_at}": "September 19, 2024",
  "{user.name}": "stella",
  "{user.mention}": "@stella",
  "{user.id}": "918273645",
  "{user.avatar}": "avatar",
  "{user.created_at}": "May 8, 2021",
  "{user.joined_at}": "Today",
  "{channel.name}": "general",
  "{channel.mention}": "#general",
  "{channel.id}": "564738291",
  "{channel.topic}": "The main community chat",
  "{date}": "September 19, 2026",
  "{time}": "10:53 AM",
  "{timestamp}": "September 19 at 10:53 AM",
  "{timestamp.relative}": "a few seconds ago",
};

export function renderVariables(value: string): string {
  return Object.entries(sampleVariables).reduce(
    (text, [variable, sample]) => text.split(variable).join(sample),
    value,
  );
}
