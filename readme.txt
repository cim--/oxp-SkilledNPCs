Skilled NPCs enables the various "skilled pilot" combat routines
introduced in 1.77 on most standard NPCs.

OXP-added NPCs with custom roles (i.e. not the pirates, traders, and
bounty hunters normally seen on the spacelanes) will not be affected.

This OXP is recommended for experienced commanders only. If you can't
fight your way through a typical Anarchy without scratching the
paintwork, you should probably come back to this one later, or it'll
be more than the paintwork which gets damaged.

===Difficulty adjustment===

The difficulty setting can be adjusted by altering the this.$baseline
property at the top of Scripts/skilled-npcs.js between 0 and 10 (or
using OXPConfig, if you have that installed). The default is 0 - you
probably should increase this in small steps if it's still too easy,
as even an increase of 1 point can have significant effects on the
game.

0 = competent: some skilled pilots, especially in Feudal/Anarchy
systems. More of a challenge, but many pilots remain at the basic AI
levels.

3 = dangerous: most pilots will be skilled, some of them very good indeed.

5 = deadly: all pilots will be skilled, many of them highly skilled.

10 = elite: all pilots will be at the highest level of skill. 

You can also select which standard roles to apply the adjustment
to. If it's still to easy, granting higher skill only to the roles you
generally fight *against* may help.

===Interactions with other OXPs===

If a ship has a "skilled_npc_role" key in its script_info data, the
value of this key will be used instead of its role to determine what
accuracy boost to apply. The value "off" will never be given any
accuracy changes, regardless of the OXP settings.

Only ships with auto_weapons set to true in their shipdata.plist will
be affected.
