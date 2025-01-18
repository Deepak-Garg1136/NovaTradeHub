package com.novaTradeHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaTradeHub.models.Asset;
import com.novaTradeHub.models.User;
import com.novaTradeHub.service.AssetService;
import com.novaTradeHub.service.UserService;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

	@Autowired
	private AssetService assetService;

	@Autowired
	private UserService userService;

	@GetMapping("/{assetId}")
	public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception {
		Asset asset = assetService.getAssetById(assetId);
		return new ResponseEntity<Asset>(asset, HttpStatus.OK);
	}

	@GetMapping("/coin/{coinId}/user")
	public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@PathVariable String coinId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);
		return new ResponseEntity<Asset>(asset, HttpStatus.OK);
	}

	@GetMapping()
	public ResponseEntity<List<Asset>> getAssetsForUser(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		List<Asset> asset = assetService.getUsersAssets(user.getId());
		return new ResponseEntity<List<Asset>>(asset, HttpStatus.OK);
	}
}
