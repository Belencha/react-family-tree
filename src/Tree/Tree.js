import React, { useState } from "react";
import TreeMember from "./TreeMember/TreeMember";
import TreeParser from "./TreeParser";

const Tree = ({ datalist, root }) => {
  // normalize all possible tree representations into single nested data object
  const parser = new TreeParser(datalist, root);
  const memberlist = parser.getMemberlist();

  const [state, setState] = useState({
    memberlist: memberlist,
    rootid: root,
    membercount: parseInt(memberlist.length),
  });

  // SIMPLE GETTERS //
  const getNextMemberId = (memberlist) => {
    if (memberlist === undefined) memberlist = state.memberlist;
    let ids = Object.keys(memberlist);
    let append = 1;
    let prepend = "new_member_";
    while (ids.indexOf(prepend + append) >= 0) append++;
    return prepend + append;
  };

  const getNewMember = (name, id) => {
    return { id: id, name: name, partners: [], children: [] };
  };

  // HANDLERS //
  const handleMemberEdit = (member_id, data) => {
    setState((prev_state) => {
      const memberlist = { ...prev_state.memberlist };
      memberlist[member_id].name = data.name;
      return { memberlist: memberlist };
    });
  };

  const handleMemberDelete = (member_id) => {
    setState((prev_state) => {
      const memberlist = { ...prev_state.memberlist };
      const member = memberlist[member_id];
      if (member.partners != null && member.partners.length > 0)
        alert("Cannot delete a member with partners");
      else alert("Delete capabilities still pending");
    });
  };

  const handleAddPartner = (root_id) => {
    setState((prev_state) => {
      let memberlist = { ...prev_state.memberlist };
      let new_id = getNextMemberId(memberlist);
      let new_member = getNewMember("New Partner", new_id);
      memberlist[new_member.id] = new_member;
      memberlist[root_id].partners.push(new_member);
      memberlist[root_id].children[new_member.id] = [];
      return { memberlist: memberlist };
    });
  };

  const handleAddChild = (root_id, partner_id) => {
    setState((prev_state) => {
      let memberlist = { ...prev_state.memberlist };
      let new_id = getNextMemberId(memberlist);
      let new_member = getNewMember("New Child", new_id);
      memberlist[new_member.id] = new_member;
      if (!Array.isArray(memberlist[root_id].children[partner_id])) {
        memberlist[root_id].children[partner_id] = [];
      }
      memberlist[root_id].children[partner_id].push(new_member);
      return { memberlist: memberlist };
    });
  };

  // RENDERERS //
  return (
    <TreeMember
      {...state.memberlist[state.rootid]}
      onAddPartner={handleAddPartner}
      onAddChild={handleAddChild}
      onEdit={handleMemberEdit}
      onDelete={handleMemberDelete}
      parentPosition={state.position}
    />
  );
};

export default Tree;
